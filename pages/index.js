const ynab = require('ynab');
const ynabApi = new ynab.API(process.env.ACCESS_TOKEN);

const Index = props => (
  <div>
    <h1>Budget Tools</h1>

    <ul>
      {props.budgets.map(budget => (
        <li key={budget.id}>{budget.name}</li>
      ))}
    </ul>
  </div>
);

Index.getInitialProps = async function() {
  const response = await ynabApi.budgets.getBudgets();
  const budgets = await response.data.budgets;

  return {
    budgets: budgets,
  };
};

export default Index;
