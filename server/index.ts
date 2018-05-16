import * as express from 'express';
import * as path from 'path';
import * as log from 'fancy-log';
import router from './controllers/router';

/**
 * My server!
 */
export class Server {
  public static bootstrap(): Server {
    const server = new Server();
    server.start();
    return server;
  }

  public app: express.Application;

  private port: number = parseInt(process.env.PORT, 10) || 5000;

  constructor() {
    this.app = express();
    this.setup();
  }

  private setup() {
    this.app.use('/api', router);

    if (process.env.WATCH) {
      this.setupWebpackDevMiddleware();
    } else {
      this.app.use(express.static(path.resolve(__dirname, '..', 'public')));
    }

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

  private start() {
    this.app.listen(this.port, () => {
      log.info(`Insecure node server started on ${this.port} ...`);
    });
  }
}

Server.bootstrap();
