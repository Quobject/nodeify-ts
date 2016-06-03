export default function (promise: Promise<any>, callback?: (err, data) => void): Promise<any> {
  if (typeof callback !== 'function') {
    return promise;
  }
  promise.then(
    function (result) {
      callback(null, result);
    }, function (error) {
      callback(error || new Error, null);
    }
  );
}
