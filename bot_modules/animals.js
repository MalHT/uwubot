/**
 * ANIMALS - Gets important pictures of important animals
 */

let botConfig = require("../config.json");
let Flickr = require("flickrapi");

let help = "**Animals**\n";
help += "Gets important pictures of important animals.\n";
help += "*!shoob*, *!pangolin*, *!corgi*, *!duck*, *!goose*, *!seal*, *!opossum*, *!bun*, *!capy*, *!axolotl*, *!fennec* *!tardi*.\n";

//** Set up Flickr api

let flickrOptions = {
    api_key: botConfig.moduleConfig.animals.flickrApikey,
    secret: botConfig.moduleConfig.animals.flickrSecretkey
  };

//** Command handlers

let commandHandlers = {};

commandHandlers.shoob = function (message, args) {

  flickrRandomPhotoBySearch("samoyed", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.pangolin = function (message, args) {

  flickrRandomPhotoByGroup("974702@N22", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.opossum = function (message, args) {

  flickrRandomPhotoBySearch("opossums", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.bun = function (message, args) {

  flickrRandomPhotoBySearch("bunny+rabbit", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.corgi = function (message, args) {

  flickrRandomPhotoBySearch("corgi+dog", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.fennec = function (message, args) {

  flickrRandomPhotoBySearch("fennec foxes", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.capy = function (message, args) {

  flickrRandomPhotoBySearch("capybara", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.axolotl = function (message, args) {

  flickrRandomPhotoBySearch("axolotl", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.tardi = function (message, args) {

  flickrRandomPhotoBySearch("tardigrade water bear", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.duck = function (message, args) {

  flickrRandomPhotoByGroup("16694458@N00", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.seal = function (message, args) {

  flickrRandomPhotoByGroup("18035618@N00", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

commandHandlers.goose = function (message, args) {

  flickrRandomPhotoByGroup("979023@N22", function (picture) {

    if (picture) {

      message.channel.send(picture);

    }

  });

};

let flickrRandomPhotoBySearch = function (term, callback) {

  Flickr.tokenOnly(flickrOptions, function(error, flickr) {

    flickr.photos.search({
      text: term,
      page: 1,
      per_page: 120,
      sort: "relevance"
    }, function(err, result) {
      if(err) {

        console.log(error);

        callback(false);

      }

      if (!err) {

        let picture = randomProperty(result.photos.photo);

        let pictureUrl = "https://farm" + picture.farm + ".staticflickr.com/" + picture.server + "/" + picture.id + "_" + picture.secret + ".jpg";

        callback(pictureUrl);

      }

    });

  });

};

let flickrRandomPhotoByGroup = function (groupid, callback) {

  Flickr.tokenOnly(flickrOptions, function(error, flickr) {

    flickr.groups.pools.getPhotos({
      group_id: groupid
    }, function(err, result) {
      if(err) {

        console.log(error);

        callback(false);

      }

      if (!err) {

        let picture = randomProperty(result.photos.photo);

        let pictureUrl = "https://farm" + picture.farm + ".staticflickr.com/" + picture.server + "/" + picture.id + "_" + picture.secret + ".jpg";

        callback(pictureUrl);

      }

    });

  });

};

let randomProperty = function (obj) {
    let keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};
