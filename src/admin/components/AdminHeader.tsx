interface Props {
  title: string;
}

export const AdminHeader = ({ title }: Props) => {
  if (title === "") title = "Home";

  return (
    <header className="items-center justify-center bg-sidebar border-b border-gray-200 px-6 py-4 h-20 fixed w-full">
      {/* Actions */}
      <div className="flex text-2xl items-center space-x-4 capitalize">
        {title.split("/")[1]}
      </div>
    </header>
  );
};
