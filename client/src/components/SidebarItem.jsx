function SidebarItem({ icon, name }) {
  return (
    <>
      <div className="w-36 h-10 flex items-center gap-2 text-lg ">
        <div className="w-10 h-10 flex justify-center items-center text-lg">
          {icon}
        </div>
        <div className="w-22 font-bold">{name}</div>
        {name === "Notifications" && <span className="badge">1</span>}
      </div>
    </>
  );
}

export default SidebarItem;
