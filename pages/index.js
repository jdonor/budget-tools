const ynab = require('ynab');
const ynabApi = new ynab.API(process.env.ACCESS_TOKEN);
const budgetId = process.env.BUDGET_ID;

const Index = props => (
  <div>
    <h1>Budget Tools</h1>

    <ul>
      {props.categoryGroups.map(categoryGroup => (
        <li key={categoryGroup.id}>{categoryGroup.name}</li>
      ))}
    </ul>
  </div>
);

Index.getInitialProps = async function() {
  const response = await ynabApi.categories.getCategories(budgetId);
  const categoryGroups = await response.data.category_groups;

  return {
    categoryGroups: categoryGroups,
  };
};

export default Index;
