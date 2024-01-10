/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response } from 'express';

export const getWishes = async (req: Request, res: Response) => {
  res.status(200).send('get wishes');
};

export const getWish = async (req: Request, res: Response) => {
  res.status(200).send('get wish');
};

export const addWish = async (req: Request, res: Response) => {
  res.status(200).send('add wish');
};

export const updateWish = async (req: Request, res: Response) => {
  res.status(200).send('update wish');
};

export const deleteWish = async (req: Request, res: Response) => {
  res.status(200).send('delete wish');
};
