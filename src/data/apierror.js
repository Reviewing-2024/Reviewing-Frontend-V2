export const handleApiError = (error) => {

  if (!error.response) {
    alert("네트워크 오류입니다. 잠시만 기다려주세요.");
    return;
  }

  const code = error.response.status;
  const message = error.response.data?.error?.message;

  switch (code) {

  case 401:
    alert(message);
    break;

  default:
    alert(message || "예기치 못한 오류가 발생하였습니다.");
}
};