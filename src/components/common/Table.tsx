import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { TableFieldLabel } from 'types';
import IconGuild from 'components/icons/IconGuild';

type Props = {
  data: any[]; // data item type should have a shape that includes an `id` property
  fieldLabels: TableFieldLabel[];
  actions?: (id: string) => JSX.Element;
  sortField: string;
  sortDir: string;
};
const Table: React.FC<Props> = ({ data, fieldLabels, actions, sortField, sortDir }) => {
  const [dataSorted] = useState(
    data.sort((a: any, b: any) => {
      if (a[sortField] > b[sortField]) {
        return sortDir === 'asc' ? 1 : -1;
      }
      if (a[sortField] < b[sortField]) {
        return sortDir === 'asc' ? -1 : 1;
      }
      return 0;
    }),
  );
  const { formatMessage } = useIntl();
  const getProcessedFieldValue = (item: any, field: TableFieldLabel) => {
    const val = item[field.slug];
    if (['price', 'priceValue', 'principal'].includes(field.slug)) {
      return `⌾${val}`;
    }
    if (field.slug === 'guildDependentTitle') {
      return (
        <span className="flex items-center">
          <span>{val}</span>
          {(item.guildDiscount > 0 || item.guildOnly) && (
            <span className="inline-block w-6 h-6 ml-2">
              <IconGuild isActive={item.hasGuildMembership} aria-label="Has Guild Discount" />
            </span>
          )}
        </span>
      );
    }
    if (field.slug === 'discountablePrice') {
      return (
        <span className="flex items-center">
          <span>⌾{val}</span>
          {item.hasGuildMembership && item.guildDiscount > 0 && (
            <>
              {' '}
              <span className="ml-2">(-{item.guildDiscount}) </span>
            </>
          )}
        </span>
      );
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
        {dataSorted.map((item: any) => (
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
