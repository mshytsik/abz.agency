const MEGABYTE_SIZE = 1048576;

export const validateImageFile = (
  file,
  onSuccess,
  onError,
  isRequired,
  minDimensions,
  maxSizeMb
) => {
  if (file) {
    const imageReader = new FileReader();
    imageReader.size = file.size;

    imageReader.onload = function (image) {
      const result = new Image();
      result.src = image.target.result;
      result.size = image.target.size;

      result.onload = (image) => {
        if (image.target.size > maxSizeMb * MEGABYTE_SIZE) {
          onError({
            type: 'size',
            message: `The photo size must not be greater than ${maxSizeMb} Mb.`,
          });
        } else if (
          image.target.width < minDimensions.width ||
          image.target.height < minDimensions.height
        ) {
          onError({
            type: 'dimensions',
            message: `Minimum size of photo is ${minDimensions.width}x${minDimensions.height}px.`,
          });
        } else {
          onSuccess(file);
        }
      };
    };

    imageReader.readAsDataURL(file);
  } else if (isRequired) {
    onError({ type: 'required', message: 'This field is required.' });
  }
};

export const scrollToSection = (sectionId) => {
  const target = document.getElementById(sectionId);

  if (target) {
    const bodyOffset = document.body.getBoundingClientRect().top;
    const headerHeight =
      document.querySelector('.header')?.getBoundingClientRect().height ?? 0;

    window.scrollTo({
      behavior: 'smooth',
      top: target.getBoundingClientRect().top - bodyOffset - headerHeight,
    });
  }
};
