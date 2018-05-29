import { Request, Response } from 'express';
import Board from '../common/board';
import TicTacToeUtil from './util/tic-tac-toe-util';
import { Move, MoveAPIResponse, Player, WinnerAPIResponse } from '../common/types';
import AI from './ai/ai';

export default class Routes {
  public static winner(req: Request, res: Response): void {
    const board: Board = req.body;
    const winner: Player = TicTacToeUtil.findWinner(board);
    const response: WinnerAPIResponse = { winner };
    res.status(200)
        .json(response);
  }

  public static easy(req: Request, res: Response): void {
    Routes.processMoveRequest(req, res, AI.getEasyMove);
  }

  public static medium(req: Request, res: Response): void {
    Routes.processMoveRequest(req, res, AI.getMediumMove);
  }

  public static hard(req: Request, res: Response): void {
    Routes.processMoveRequest(req, res, AI.getHardMove);
  }

  public static luna(req: Request, res: Response): void {
    Routes.processMoveRequest(req, res, AI.getLunaMove);
  }

  private static processMoveRequest(req: Request, res: Response, fn: (board: Board) => Move) {
    const board: Board = req.body;
    const move: Move = fn(board);
    board.set(move, Player.AI);
    const winner: Player = TicTacToeUtil.findWinner(board);
    const response: MoveAPIResponse = { move, winner };
    res.status(200)
        .json(response);
  }
}