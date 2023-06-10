const useElapsedTimeCalc = (createdAt) => {
  let elapsedTimeDisplay;
  const now = new Date();
  const createdDate = new Date(createdAt);

  const elapsedSeconds = (now.getTime() - createdDate.getTime()) / 1000;

  if (elapsedSeconds < 3_600) {
    return (elapsedTimeDisplay = (
      <> {Math.round(elapsedSeconds / 60)} minutes ago </>
    ));
  } else if (elapsedSeconds < 86_400) {
    return (elapsedTimeDisplay = (
      <> {Math.round(elapsedSeconds / 3600)} hours ago </>
    ));
  } else {
    return (elapsedTimeDisplay = (
      <>
        {createdDate.getUTCDate()}/{createdDate.getMonth() + 1}/
        {createdDate.getFullYear()}
      </>
    ));
  }
};
export default useElapsedTimeCalc;
