import { ListFrontVO } from './ListFrontVO.interface';

export class Total {
  static addTotalRow<T extends Record<string, any>>(
    list: ListFrontVO<T>,
    fieldsToSum: (keyof T)[],
    label?: { field: keyof T; text: string },
  ): ListFrontVO<T> {
    const totalRow = {} as T;

    fieldsToSum.forEach((field) => {
      totalRow[field] = (list.rows as T[]).reduce<number>(
        (acc, row) => acc + Number(row[field] ?? 0),
        0,
      ) as any;
    });

    if (label) {
      totalRow[label.field] = label.text as any;
    }

    return {
      ...list,
      rows: [...list.rows, totalRow],
    };
  }
}
