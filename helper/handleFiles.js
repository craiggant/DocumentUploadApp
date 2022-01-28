const sortFile = (acceptableFileTypes, maxFileSize, file, objectToReturn) => {
	const { validFiles, invalidFiles, errorMessages } = objectToReturn;
	// isolates file type (ex: 'pdf') from longer string (ex: 'application/pdf')
	const fType = file.type.split('/')[1];

	// check to see if file already exists in upload queue
	const fileAlreadyExists = validFiles.find(
		(existingFile) => existingFile.name === file.name
	);

	if (!fileAlreadyExists) {
		if (acceptableFileTypes.includes(fType) && file.size <= maxFileSize) {
			validFiles.push(file);
		} else {
			invalidFiles.push(file);
			// add error messages based on type of failure
			// add error based on invalid file type
			if (!acceptableFileTypes.includes(fType)) {
				const acceptableTypeString = acceptableFileTypes.map(
					(typeString) => ` ${typeString}`
				);
				// if only one acceptable type, change message
				errorMessages.add(
					acceptableFileTypes.length > 1
						? `Files must be one of the following types: ${acceptableTypeString}`
						: `File must be a ${acceptableTypeString}`
				);
			}
			// add error based on file size failure.
			if (file.size > maxFileSize) {
				errorMessages.add(
					`Files must be under ${maxFileSize / 1000}MB size limit.`
				);
			}
		}
	}

	return { validFiles, invalidFiles, errorMessages };
};

/**
 * Takes in filelist and checks each file to ensure each is a valid type.
 * Returns an interface with validFiles, invalidFiles, and an error boolean.
 *
 * @param acceptableFileTypes
 * @param maxFileSize
 * @param fileList
 * @returns {fileInterface} Interface with arrays of valid and invalid files and a boolean for error states
 */

export const handleFileList = (
	acceptableFileTypes,
	maxFileSize,
	fileList,
	currentFiles
) => {
	const arrayOfFiles = Array.from(fileList);
	// clear invalid files and errors for each new submission to ensure proper error handling
	let fileInterface = currentFiles;
	fileInterface.invalidFiles = [];
	fileInterface.errorMessages.clear();

	arrayOfFiles.forEach((file) => {
		const sorted = sortFile(
			acceptableFileTypes,
			maxFileSize,
			file,
			fileInterface
		);
		fileInterface = sorted;
	});

	if (
		fileInterface.validFiles.length === 0 &&
		fileInterface.invalidFiles.length === 0
	) {
		fileInterface.errorMessages.add(
			'There was a problem with your upload. Please ensure the file(s) are valid and try again.'
		);
	}

	return fileInterface;
};
