module.exports = (app, cookieParser, bodyParser, passport, cors) => {
    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(passport.initialize());
}