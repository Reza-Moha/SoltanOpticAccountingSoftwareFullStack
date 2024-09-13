import Table from "@/components/Ui/Table";

export default function PermissionsList({ permissions }) {
  return (
    <Table>
      <Table.Header>
        <th>عنوان</th>
        <th>توضیحات</th>
      </Table.Header>
      <Table.Body>
        {permissions?.length > 0 ? (
          permissions.map((permission) => (
            <Table.Row key={permission.id}>
              <td>{permission.title}</td>
              <td>
                {permission.description.length > 35
                  ? `${permission.description.slice(0, 35)}...`
                  : permission.description}
              </td>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <td colSpan="2" className="text-center">
              هیچ سطح دسترسی‌ای یافت نشد.
            </td>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
