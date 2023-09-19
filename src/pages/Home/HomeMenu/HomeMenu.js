import { Tabs } from "antd";

const HomeMenu = () => {
  return (
    <>
      <Tabs
        tabPosition={"left"}
        items={new Array(3).fill(null).map((_, i) => {
          const id = String(i + 1);
          return {
            label: (
              <img
                src="https://picsum.photos/200"
                alt="img-ant"
                className="rounded-full"
                width={50}
              />
            ),
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}
      />
    </>
  );
};
export default HomeMenu;
