import Page from "../components/common/Page";
import Profile from "../components/My/Profile";
import TodoList from "../components/My/TodoList";

const MyPage = () => {
  return (
    <Page title="마이페이지">
      <Profile />
      <TodoList />
    </Page>
  );
};

export default MyPage;
