import { FormattedMessage, useIntl } from 'react-intl';
import { TableFieldLabel } from 'types';

type Props = {
  data: any[]; // data item type should have a shape that includes an `id` property
  fieldLabels: TableFieldLabel[];
  actions?: (id: string) => JSX.Element;
};
const Table: React.FC<Props> = ({ data, fieldLabels, actions }) => {
  const { formatMessage } = useIntl();
  const getProcessedFieldValue = (item: any, field: TableFieldLabel) => {
    const val = item[field.slug];
    if (['price', 'priceValue', 'principal'].includes(field.slug)) {
      return `⌾${val}`;
    }
    if (typeof val === 'boolean') {
      return formatMessage({ id: val ? 'yes' : 'no' });
    }
    return val;
  };
  return (
    <table
      className="gap-4 w-full max-w-full overflow-x-hidden border-collapse"
      data-testid="table"
    >
      <thead className="bg-gray-600 text-gray-100 hidden sm:table-header-group">
        <tr>
          {fieldLabels.map((fieldLabel) => (
            <th
              key={`fieldLabel-${fieldLabel.slug}`}
              className="p-4 uppercase text-left w-full sm:w-auto"
            >
              <FormattedMessage id={fieldLabel.titleKey} />
            </th>
          ))}
          {!!actions && (
            <th className="p-4 uppercase text-left">
              <FormattedMessage id="tables__action_field" />
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr key={item.id} id={`lmftft-${item.id}`} className="even:bg-gray-300">
            {fieldLabels.map((field: TableFieldLabel) => (
              <td className="p-4 block sm:table-cell" key={field.slug}>
                <span className="inline-block sm:hidden font-bold">
                  <FormattedMessage id={field.titleKey} />
                  :&nbsp;
                </span>
                {getProcessedFieldValue(item, field)}
              </td>
            ))}
            {!!actions && <td className="p-4 block sm:table-cell">{actions(item.id)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
