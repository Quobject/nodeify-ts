export default function (promise: Promise<any>, callback?: (err: any, data: any) => void): Promise<any> {
  if (typeof callback !== 'function') {
    return promise;
  }
  return promise.then(
    (result) => {
      callback(null, result);
    }, (error) => {
      callback(error || new Error, null);
    },
  );
}
