/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response } from 'express';

export const getWishes = async (req: Request, res: Response) => {
  res.status(200).send(res.locals.models.wishes);
};

export const getWish = async (req: Request, res: Response) => {
  const wish = res.locals.models.wishes.find(
    ({ id }: { id: number }) => id === Number(req.params.id)
  );

  res.status(200).send(wish);
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
