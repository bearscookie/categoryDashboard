interface Request<Option, Data> {
  (o: Option): Promise<{ data?: Data }>
  url: string
  method: string
}

/** 从返回的数据中提取 data 属性 */
export const peelDataFromResponse =
  <Option, Data>(fn: Request<Option, Data>, defaultValue: any) =>
  (o: Option) =>
    fn(o).then((res: { data?: Data }) => res.data || defaultValue)

/** 从返回的数据中提取 res  */
export const peelResFromResponse =
  <Option, Data>(fn: Request<Option, Data>) =>
  (o: Option) =>
    fn(o).then(res => res)
