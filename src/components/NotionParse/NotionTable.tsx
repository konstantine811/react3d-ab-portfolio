import { IBlog } from "@models/blog.model";
import { INotion } from "@models/server-response/notion.model";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import NotionText from "./NotionText";

export interface INotaionTableProps {
  data: IBlog.BlogArticle[];
}

const NotaionTable = ({ data }: INotaionTableProps) => {
  const tableColumnNames = (
    data.find((i) => i.type === INotion.TypeContent.table)
      ?.format as IBlog.BlogTableFormat
  ).table_block_column_order.map((item, index) => {
    return { key: index, label: item };
  });
  const tableRow = data.filter((i) => i.type === INotion.TypeContent.table_row);
  const tableHeaderColumn = tableRow[0]
    ?.properties as INotion.ContentTableProperties;
  tableRow.shift();
  return (
    <>
      {tableColumnNames &&
      tableColumnNames.length &&
      tableRow &&
      tableRow.length ? (
        <Table
          classNames={{
            table: "min-h-[400px]",
          }}
          aria-label="Example table with client side sorting"
        >
          <TableHeader columns={tableColumnNames}>
            {(column) => (
              <TableColumn key={column.label}>
                {tableHeaderColumn[column.label].join(" ")}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={tableRow}>
            {(item) => {
              const itemTableProp =
                item.properties as INotion.ContentTableProperties;
              return (
                <TableRow key={item.id}>
                  {tableColumnNames.map((key) => {
                    return (
                      <TableCell key={`${item.id}_${key.key}`}>
                        <NotionText
                          data={itemTableProp[key.label]}
                          type={INotion.TypeContent.text}
                          id={item.id}
                          className="text-base"
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      ) : null}
    </>
  );
};

export default NotaionTable;
