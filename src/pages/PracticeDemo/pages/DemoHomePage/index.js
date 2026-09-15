

const DemoHomePage = () => {
  return (
    <div>
      <p>我是练习模块的主页</p>
      {
        Array.from({ length: 100 }, (_, index) => (
          <p key={index}>我是练习模块的主页第{index + 1}行</p>
        ))
      }
    </div>
  );
};

export default DemoHomePage;