const getToken = async page => {
    return page.evaluate(async () => {
      return new Promise(resolve => {
        window.grecaptcha
          .execute("6LevKusUAAAAAAFknhlV8sPtXAk5Z5dGP5T2FYIZ", {
            action: "homepage"
          })
          .then(function(e) {
            console.log(e);
            resolve(e);
          });
      });
    });
};

module.exports = getToken;
