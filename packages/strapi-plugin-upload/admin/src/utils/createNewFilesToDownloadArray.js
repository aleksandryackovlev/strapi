import axios from 'axios';
import { isEmpty } from 'lodash';

const getTempsIds = alreadyUploadedFiles => {
  return [...new Set([0, ...alreadyUploadedFiles.map(file => file.tempId).filter(id => !!id)])];
};

const getMax = arr => {
  return Math.max.apply(Math, arr) + 1;
};

const createNewFilesToDownloadArray = (filesURLArray, alreadyUploadedFiles) => {
  const tempIds = getTempsIds(alreadyUploadedFiles);
  const max = getMax(tempIds);

  const arrayToReturn = filesURLArray.reduce((acc, current, index) => {
    if (isEmpty(current)) {
      return acc;
    }

    const CancelToken = axios.CancelToken;
    const abortController = new AbortController();
    const source = CancelToken.source();

    acc.push({
      abortController,
      source,
      file: null,
      fileInfo: {
        alternativeText: '',
        caption: '',
        name: current,
      },
      fileURL: current,
      hasError: false,
      errorMessage: null,
      isUploading: false,
      isDownloading: true,
      tempId: max + index,
    });

    return acc;
  }, []);

  return arrayToReturn;
};

export default createNewFilesToDownloadArray;
export { getMax, getTempsIds };
