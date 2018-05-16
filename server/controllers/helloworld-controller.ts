import * as express from 'express';

class HelloWorldController {
  public static get(req: express.Request, res: express.Response) {
    res.send('Buahahahahaha');
  }
}

export default HelloWorldController;