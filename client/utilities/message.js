import toastr from 'toastr';

const errorMessage = (error) => {
  toastr.error(error);
};

export default errorMessage;
