import hash from 'object-hash';

/**
 * Function compares the hashed values of two files. If the hashes match, the file is a duplicate file.
 * @param {File} file1
 * @param {File} file2
 * @returns {boolean} boolean
 */

export const fileCompare = (file1, file2) => {
	const hashOfFile1 = hash(file1);
	const hashOfFile2 = hash(file2);
	if (hashOfFile1 === hashOfFile2) {
		return true;
	}
	return false;
};
