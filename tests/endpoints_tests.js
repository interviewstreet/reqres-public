/*
Check all `/api` endpoints
    countries.json
      ✓ /api/countries?page=... (157ms)
      ✓ /api/countries?property=...&page=...
      ✓ /api/countries/search?property=...&page=...
    inventory.json
      ✓ /api/inventory?page=... (59ms)
      ✓ /api/inventory?property=...&page=...
      ✓ /api/inventory/search?property=...&page=...
    movies.json
      ✓ /api/movies?page=... (726ms)
      ✓ /api/movies?property=...&page=...
      ✓ /api/movies/search?property=...&page=...
    stocks.json
      ✓ /api/stocks?page=... (41ms)
      ✓ /api/stocks?property=...&page=...
      ✓ /api/stocks/search?property=...&page=...

  Dynamic APIs
    ✓ /datetime
*/


let data = require('../data.json'),
    server = require('../app');

const Promise = require('bluebird'),
      chai = require('chai'),
      chaiHttp = require('chai-http'),
      range = require('lodash.range'),
      fecha = require('fecha');

const should = chai.should();

chai.use(chaiHttp);

describe('Check all `/api` endpoints', () => {

  describe('countries.json', () => {
    it('/api/countries?page=...', (done) => {
      let startIndex = 0;
      let endIndex = 10;
      let pages = [];
      for (let i = 1; i <= 25; i += 1)
        pages.push(i);

      Promise.mapSeries(pages, (page) => {
        return chai.request(server)
          .get('/api/countries?page=' + page.toString())
          .then((res) => {
            return res.body.data;
          })
      }).then((results) => {
        for (let result of results) {
          result.should.be.eql(data['countries'].slice(startIndex, endIndex));
          startIndex += 10;
          endIndex += 10;
        }
        done();
      }).catch((err) => {
        console.log(err);
        done(err);
      });
    });

    it('/api/countries?property=...&page=...', (done) => {
      chai.request(server)
        .get('/api/countries?name=Nigeria&page=1')
        .then((res) => {
          res.body.data[0].should.be.eql({
            "name": "Nigeria",
            "nativeName": "Nigeria",
            "topLevelDomain": [".ng"],
            "alpha2Code": "NG",
            "numericCode": "566",
            "alpha3Code": "NGA",
            "currencies": ["NGN"],
            "callingCodes": ["234"],
            "capital": "Abuja",
            "altSpellings": ["NG", "Nijeriya", "Naíjíríà", "Federal Republic of Nigeria"],
            "relevance": "1.5",
            "region": "Africa",
            "subregion": "Western Africa",
            "language": ["English"],
            "languages": ["en"],
            "translations": {
              "de": "Nigeria",
              "es": "Nigeria",
              "fr": "Nigéria",
              "it": "Nigeria",
              "ja": "ナイジェリア",
              "nl": "Nigeria",
              "hr": "Nigerija"
            },
            "population": 182202000,
            "latlng": [10, 8],
            "demonym": "Nigerian",
            "borders": ["BEN", "CMR", "TCD", "NER"],
            "area": 923768,
            "gini": 48.8,
            "timezones": ["UTC+01:00"]
          });
          done();
        });
    });

    it('/api/countries/search?property=...&page=...', (done) => {
      chai.request(server)
        .get('/api/countries/search?name=zam&page=1')
        .then((res) => {
          res.body.data.should.be.eql([{
            "name": "Mozambique",
            "nativeName": "Moçambique",
            "topLevelDomain": [".mz"],
            "alpha2Code": "MZ",
            "numericCode": "508",
            "alpha3Code": "MOZ",
            "currencies": ["MZN"],
            "callingCodes": ["258"],
            "capital": "Maputo",
            "altSpellings": ["MZ", "Republic of Mozambique", "República de Moçambique"],
            "relevance": "0",
            "region": "Africa",
            "subregion": "Eastern Africa",
            "language": ["Portuguese"],
            "languages": ["pt"],
            "translations": {
              "de": "Mosambik",
              "es": "Mozambique",
              "fr": "Mozambique",
              "it": "Mozambico",
              "ja": "モザンビーク",
              "nl": "Mozambique",
              "hr": "Mozambik"
            },
            "population": 25727911,
            "latlng": [-18.25, 35],
            "demonym": "Mozambican",
            "borders": ["MWI", "ZAF", "SWZ", "TZA", "ZMB", "ZWE"],
            "area": 801590,
            "gini": 45.7,
            "timezones": ["UTC+02:00"]
          }, {
            "name": "Zambia",
            "nativeName": "Zambia",
            "topLevelDomain": [".zm"],
            "alpha2Code": "ZM",
            "numericCode": "894",
            "alpha3Code": "ZMB",
            "currencies": ["ZMW"],
            "callingCodes": ["260"],
            "capital": "Lusaka",
            "altSpellings": ["ZM", "Republic of Zambia"],
            "relevance": "0",
            "region": "Africa",
            "subregion": "Eastern Africa",
            "language": ["English"],
            "languages": ["en"],
            "translations": {
              "de": "Sambia",
              "es": "Zambia",
              "fr": "Zambie",
              "it": "Zambia",
              "ja": "ザンビア",
              "nl": "Zambia",
              "hr": "Zambija"
            },
            "population": 15473905,
            "latlng": [-15, 30],
            "demonym": "Zambian",
            "borders": ["AGO", "BWA", "COD", "MWI", "MOZ", "NAM", "TZA", "ZWE"],
            "area": 752612,
            "gini": 54.6,
            "timezones": ["UTC+02:00"]
          }]);
          done();
        });
    });
  });

  describe('inventory.json', () => {
    it('/api/inventory?page=...', (done) => {
      let startIndex = 0;
      let endIndex = 500;
      let pages = [];
      for (let i = 1; i <= 6; i += 1)
        pages.push(i);

      Promise.mapSeries(pages, (page) => {
        return chai.request(server)
          .get('/api/inventory?page=' + page.toString())
          .then((res) => {
            return res.body.data;
          })
      }).then((results) => {
        for (let result of results) {
          result.should.be.eql(data['inventory'].slice(startIndex, endIndex));
          startIndex += 500;
          endIndex += 500;
        }
        done();
      }).catch((err) => {
        console.log(err);
        done(err);
      });
    });

    it('/api/inventory?property=...&page=...', (done) => {
      chai.request(server)
        .get('/api/inventory?barcode=47000076&page=1')
        .then((res) => {
          res.body.data[0].should.be.eql({
            "barcode": "47000076",
            "item": "Knickers",
            "category": "Underwear",
            "price": 4010,
            "discount": 9,
            "available": 0
          });
          done();
        });
    });

    it('/api/inventory/search?property=...&page=...', (done) => {
      chai.request(server)
        .get('/api/inventory/search?item=Ball&page=1')
        .then((res) => {
          res.body.data.should.be.eql([{
            "barcode": "74001755",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 785,
            "discount": 7,
            "available": 1
          }, {
            "barcode": "74002271",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2004,
            "discount": 6,
            "available": 1
          }, {
            "barcode": "47000207",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4874,
            "discount": 6,
            "available": 0
          }, {
            "barcode": "74001067",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4058,
            "discount": 17,
            "available": 1
          }, {
            "barcode": "74002013",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 309,
            "discount": 5,
            "available": 1
          }, {
            "barcode": "47000379",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2668,
            "discount": 6,
            "available": 0
          }, {
            "barcode": "74002443",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2344,
            "discount": 7,
            "available": 1
          }, {
            "barcode": "74000379",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 3742,
            "discount": 11,
            "available": 1
          }, {
            "barcode": "74001669",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 1442,
            "discount": 6,
            "available": 1
          }, {
            "barcode": "74000551",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4221,
            "discount": 8,
            "available": 1
          }, {
            "barcode": "74001497",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2299,
            "discount": 13,
            "available": 1
          }, {
            "barcode": "74002357",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2159,
            "discount": 7,
            "available": 1
          }, {
            "barcode": "47000293",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 3766,
            "discount": 13,
            "available": 0
          }, {
            "barcode": "74000723",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4979,
            "discount": 8,
            "available": 1
          }, {
            "barcode": "74000121",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2714,
            "discount": 17,
            "available": 1
          }, {
            "barcode": "74001153",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4688,
            "discount": 10,
            "available": 1
          }, {
            "barcode": "74001927",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2069,
            "discount": 16,
            "available": 1
          }, {
            "barcode": "47000465",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2085,
            "discount": 17,
            "available": 0
          }, {
            "barcode": "74000207",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 1291,
            "discount": 7,
            "available": 1
          }, {
            "barcode": "74002099",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 54,
            "discount": 5,
            "available": 1
          }, {
            "barcode": "74000637",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 3159,
            "discount": 19,
            "available": 1
          }, {
            "barcode": "74000981",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2972,
            "discount": 17,
            "available": 1
          }, {
            "barcode": "74000035",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 1417,
            "discount": 7,
            "available": 1
          }, {
            "barcode": "74001841",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4351,
            "discount": 12,
            "available": 1
          }, {
            "barcode": "47000035",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4974,
            "discount": 7,
            "available": 0
          }, {
            "barcode": "74001239",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4082,
            "discount": 13,
            "available": 1
          }, {
            "barcode": "47000121",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4289,
            "discount": 13,
            "available": 0
          }, {
            "barcode": "74002185",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 96,
            "discount": 7,
            "available": 1
          }, {
            "barcode": "74000465",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 2886,
            "discount": 20,
            "available": 1
          }, {
            "barcode": "74001411",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 176,
            "discount": 5,
            "available": 1
          }, {
            "barcode": "74000293",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 3896,
            "discount": 15,
            "available": 1
          }, {
            "barcode": "74000895",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 1665,
            "discount": 11,
            "available": 1
          }, {
            "barcode": "74001583",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4368,
            "discount": 5,
            "available": 1
          }, {
            "barcode": "74001325",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 3823,
            "discount": 11,
            "available": 1
          }, {
            "barcode": "74000809",
            "item": "Ball Gown",
            "category": "Full Body Outfits",
            "price": 4079,
            "discount": 19,
            "available": 1
          }]);
          done();
        });
    });
  });

  describe('movies.json', () => {
    it('/api/movies?page=...', (done) => {
      let startIndex = 0;
      let endIndex = 10;
      let pages = [];
      for (let i = 1; i <= 277; i += 1)
        pages.push(i);

      Promise.mapSeries(pages, (page) => {
        return chai.request(server)
          .get('/api/movies?page=' + page.toString())
          .then((res) => {
            return res.body.data;
          })
      }).then((results) => {
        for (let result of results) {
          result.should.be.eql(data['movies'].slice(startIndex, endIndex));
          startIndex += 10;
          endIndex += 10;
        }
        done();
      }).catch((err) => {
        console.log(err);
        done(err);
      });
    });

    it('/api/movies?property=...&page=...', (done) => {
      chai.request(server)
        .get('/api/movies?imdbID=tt5847056&page=1')
        .then((res) => {
          res.body.data[0].should.be.eql({
            "Title": "Behind the Scenes of the Most Fascinating Waterworld on Earth: The Great Backwaters, Kerala.",
            "Year": 2014,
            "imdbID": "tt5847056"
          });
          done();
        });
    });

    it('/api/movies/search?property=...&page=...', (done) => {
      chai.request(server)
        .get('/api/movies/search?Title=Behind&page=1')
        .then((res) => {
          res.body.data.should.be.eql([{
            "Title": "Behind the Scenes of the Most Fascinating Waterworld on Earth: The Great Backwaters, Kerala.",
            "Year": 2014,
            "imdbID": "tt5847056"
          }, {
            "Title": "'Harry Potter': Behind the Magic",
            "Year": 2001,
            "imdbID": "tt0301379"
          }, {
            "Title": "'Harry Potter': Behind the Magic",
            "Year": 2005,
            "imdbID": "tt0497106"
          }, {
            "Title": "Behind the Scenes of 'Sin the Movie'",
            "Year": 2000,
            "imdbID": "tt4663740"
          }, {
            "Title": "Walk & Talk - The West Wing Reunion: Behind the Scenes",
            "Year": 2012,
            "imdbID": "tt2401109"
          }, {
            "Title": "Behind the Scenes of Walk Tall Stand Strong",
            "Year": 2012,
            "imdbID": "tt2936294"
          }]);
          done();
        });
    });
  });

  describe('stocks.json', () => {
    it('/api/stocks?page=...', (done) => {
      let startIndex = 0;
      let endIndex = 500;
      let pages = range(1, 6);

      Promise.mapSeries(pages, (page) => {
        return chai.request(server)
          .get('/api/stocks?page=' + page.toString())
          .then((res) => {
            return res.body.data;
          })
      }).then((results) => {
        for (let result of results) {
          result.should.be.eql(data['stocks'].slice(startIndex, endIndex));
          startIndex += 500;
          endIndex += 500;
        }
        done();
      }).catch((err) => {
        console.log(err);
        done(err);
      });
    });

    it('/api/stocks?property=...&page=...', (done) => {
      chai.request(server)
        .get('/api/stocks?date=7-February-2000&page=1')
        .then((res) => {
          res.body.data[0].should.be.eql({
            date: '7-February-2000',
            open: 5431.55,
            high: 5518.29,
            low: 5431.55,
            close: 5474
          });
          done();
        });
    });

    it('/api/stocks/search?property=...&page=...', (done) => {
      chai.request(server)
        .get('/api/stocks/search?date=17-February&page=1')
        .then((res) => {
          res.body.data.should.be.eql([{
            "date": "17-February-2000",
            "open": 5810.24,
            "high": 5877.04,
            "low": 5799.79,
            "close": 5835.15
          }, {
            "date": "17-February-2003",
            "open": 3248.9,
            "high": 3287.01,
            "low": 3248.9,
            "close": 3282.45
          }, {
            "date": "17-February-2005",
            "open": 6598.77,
            "high": 6599.48,
            "low": 6532.5,
            "close": 6589.29
          }, {
            "date": "17-February-2006",
            "open": 10168.55,
            "high": 10184.04,
            "low": 9970,
            "close": 9981.11
          }, {
            "date": "17-February-2011",
            "open": 18345.12,
            "high": 18532.61,
            "low": 18233.79,
            "close": 18506.82
          }]);
          done();
        });
    });
  });

  describe('football_competitions.json', () => {
    it('/api/football/competitions?page=...', (done) => {
        let startIndex = 0;
        let endIndex = 10;
        let pages = range(1, 6);

        Promise.mapSeries(pages, (page) => {
            return chai.request(server)
              .get('/api/football/competitions/?page=' + page.toString())
              .then((res) => {
                return res.body.data;
              })
          }).then((results) => {
            for (let result of results) {
              result.should.be.eql(data['football_competitions'].slice(startIndex, endIndex));
              startIndex += 10;
              endIndex += 10;
            }
            done();
          }).catch((err) => {
            console.log(err);
            done(err);
          });
    })

    it('/api/football/competitions?property=...&page=...', (done) => {
        chai.request(server)
          .get('/api/football/competitions?name=UEFA Champions League&year=2014')
          .then((res) => {
            res.body.data[0].should.be.eql({
              name: "UEFA Champions League",
              country: "",
              year: 2014,
              winner: "Barcelona",
              runnerup: "Juventus"
            });
            done();
          }).catch((err) => {
            console.log(err);
            done(err);
          });
        });
  });

  describe('football_matches.json', () => {
    it('/api/football/matches?page=...', (done) => {
        let startIndex = 0;
        let endIndex = 10;
        let pages = range(1, 6);

        Promise.mapSeries(pages, (page) => {
            return chai.request(server)
              .get('/api/football/matches/?page=' + page.toString())
              .then((res) => {
                return res.body.data;
              })
          }).then((results) => {
            for (let result of results) {
              result.should.be.eql(data['football_matches'].slice(startIndex, endIndex));
              startIndex += 10;
              endIndex += 10;
            }
            done();
          }).catch((err) => {
            console.log(err);
            done(err);
          });
    })

    it('/api/football/matches?property=...&page=...', (done) => {
        chai.request(server)
          .get('/api/football/matches?competition=UEFA Champions League&team1=Barcelona&round=final')
          .then((res) => {
            res.body.data[0].should.be.eql({
                competition: "UEFA Champions League",
                team1: "Barcelona",
                team2: "Juventus",
                team1goals: "3",
                team2goals: "1",
                year: 2014,
                round: "final"
            });
            done();
          }).catch((err) => {
            console.log(err);
            done(err);
          });
        });
  });

  describe('restaurants.json', () => {
    it('/api/restaurants?page=...', (done) => {
        let startIndex = 0;
        let endIndex = 15;
        let pages = range(1, 6);

        Promise.mapSeries(pages, (page) => {
            return chai.request(server)
              .get('/api/restaurants/?page=' + page.toString())
              .then((res) => {
                return res.body.data;
              })
          }).then((results) => {
            for (let result of results) {
              result.should.be.eql(data['restaurants'].slice(startIndex, endIndex));
              startIndex += 15;
              endIndex += 15;
            }
            done();
          }).catch((err) => {
            console.log(err);
            done(err);
          });
    })

    it('/api/restaurants?property=...&page=...', (done) => {
        chai.request(server)
          .get('/api/restaurants?city=bangalore&name=Byg Brewski Brewing Company')
          .then((res) => {
            res.body.data[0].should.be.eql({
                "city": "bangalore",
                "name": "Byg Brewski Brewing Company",
                "estimated_cost": 1600,
                "user_rating": {
                    "aggregate_rating": "4.9",
                    "votes": "16203"
                },
                "id": "41"
            });
            done();
          }).catch((err) => {
            console.log(err);
            done(err);
          });
        });
  });

  describe('iot_devices.json', () => {
    it('/api/iot_devices?page=...', (done) => {
        let startIndex = 0;
        let endIndex = 10;
        let pages = range(1, 10);

        Promise.mapSeries(pages, (page) => {
            return chai.request(server)
              .get('/api/iot_devices/?page=' + page.toString())
              .then((res) => {
                return res.body.data;
              })
          }).then((results) => {
            for (let result of results) {
              result.should.be.eql(data['iot_devices'].slice(startIndex, endIndex));
              startIndex += 10;
              endIndex += 10;
            }
            done();
          }).catch((err) => {
            console.log(err);
            done(err);
          });
    })

    it('/api/iot_devices?property=...&page=...', (done) => {
        chai.request(server)
          .get('/api/iot_devices?status=RUNNING')
          .then((res) => {
            res.body.data[0].should.be.eql({
              "id": 4,
              "timestamp": 1554240798496,
              "status": "RUNNING",
              "operatingParams": {
                "rotorSpeed": 2967,
                "slack": 37.32,
                "rootThreshold": 0
              },
              "asset": {
                "id": 2,
                "alias": "Main Rotor Shaft"
              }
            });
            done();
          }).catch((err) => {
            console.log(err);
            done(err);
          });
        });
  });
});

describe('Dynamic APIs', () => {
  it('/datetime', (done) => {
    chai.request(server)
        .get('/datetime')
        .then((res) => {
          res.body.should.be.eql({
            time: fecha.format(new Date(), 'hh:mm:ss A'),
            date: fecha.format(new Date(), 'MM-DD-YYYY')
          });
          done();
        })
  });
});
