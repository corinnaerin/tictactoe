import * as express from 'express';
import * as path from 'path';
import * as log from 'fancy-log';
import validateBoard from './middleware/validate-board';
import errorHandler from './middleware/error-handler';
import WinnerController from './controllers/winner-controller';

/**
 * My server!
 */
class Server {
  public app: express.Application;

  private port: number = parseInt(process.env.PORT, 10) || 5000;

  constructor() {
    this.app = express();
    this.setup();
  }

  public start() {
    this.app.listen(this.port, () => {
      log.info(`Insecure node server started on ${this.port} ...`);
    });
  }

  private setup() {

    this.routes();

    if (process.env.WATCH) {
      this.setupWebpackDevMiddleware();
    } else {
      this.app.use(express.static(path.resolve(__dirname, '..', 'public')));
    }

  }

  private routes() {
    const router = express.Router();

    router.use(express.json());
    router.use(validateBoard);
    router.use(errorHandler);

    router.post('/winner', WinnerController.post);

    this.app.use('/api', router);
  }

  private setupWebpackDevMiddleware() {
    log.warn('Enabling webpack hot reloading. You should only see this message when developing locally.');
    const webpackConfig = require('../webpack.config');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    // Enable hot reloading
    webpackConfig.entry.unshift('webpack-hot-middleware/client');
    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(webpackConfig);
    const options = {
      hot: true,
      https: false,
      publicPath: '',
      quiet: false,
      stats: { colors: true }
    };
    this.app.use(webpackDevMiddleware(compiler, options));
    this.app.use(webpackHotMiddleware(compiler));
  }
}

export default new Server();
