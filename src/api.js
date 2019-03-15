var get = function(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, params)
        .then(res => {
          console.log(res)
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  var post = function(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(res => {
          console.log(res)
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
export default {get,post};