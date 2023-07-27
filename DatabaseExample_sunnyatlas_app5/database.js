mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
mongoose.connect(config.db_url, {useMongoClient: true});