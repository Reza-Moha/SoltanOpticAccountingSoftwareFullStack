import Table from "@/components/Ui/Table";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { IoRemoveOutline } from "react-icons/io5";
import Image from "next/image";

export default function ListOfLens() {
  const dispatch = useDispatch();

  const { lensList, isLoading } = useSelector((state) => state.lensSlice);

  const handleDeleteLens = (id) => {
    // dispatch(deleteLensType(id));
  };

  console.log(lensList);

  return (
    <div className="border-t border-secondary-500">
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <Table>
          <Table.Header>
            <th>نام عدسی</th>
            <th> عدسی</th>
            <th>ضریب شکست</th>
            <th>دسته بندی</th>
            <th>توضیحات</th>
            <th>عملیات</th>
          </Table.Header>
          <Table.Body>
            {lensList?.length > 0 ? (
              lensList.map((lens) => (
                <motion.tr key={lens.id}>
                  <td className="text-lg font-bold flex items-center gap-x-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${lens.lensImage}`}
                      alt={lens.lensName}
                      width="40"
                      height="40"
                      className="object-fill rounded-full "
                    />
                    <h3 className="font-bold text-base">{lens.lensName}</h3>
                  </td>
                  <td>
                    {lens?.LensType?.title || <IoRemoveOutline size={16} />}
                  </td>
                  <td>
                    {lens?.RefractiveIndex?.index || (
                      <IoRemoveOutline size={16} />
                    )}
                  </td>
                  <td>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${
                        lens?.lens - category?.lensImage
                      }`}
                      alt={lens?.lens - category?.lensName}
                      width="40"
                      height="40"
                      className="object-fill rounded-full "
                    />
                    <h3 className="font-bold text-base">{lens.lensName}</h3>
                  </td>
                  <td className="font-bold text-sm">
                    {lens.description.length > 30
                      ? `${lens.description.substring(0, 30)}...`
                      : lens.description}
                  </td>
                  <td>
                    <button
                      className="text-rose-500 hover:bg-rose-100 rounded-full p-1 transition-all ease-in-out duration-300"
                      onClick={() => handleDeleteLens(lens.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <Table.Row>
                <td colSpan="3" className="text-center">
                  عدسی یافت نشد.
                </td>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
