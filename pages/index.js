const ynab = require('ynab');
const ynabApi = new ynab.API(process.env.ACCESS_TOKEN);
const budgetId = process.env.BUDGET_ID;

const internalMasterCategoryId = '4a23e6b1-9f17-4dc5-ab08-7f2c6f162b8f';
const hiddenCategoriesId = 'fe740ab3-0cd1-478d-8ed9-9314baa9e949';

const Index = props => (
  <div>
    <h1>Budget Tools</h1>

    <ul>
      {props.categoryGroups.map(categoryGroup => (
        <li key={categoryGroup.id}>
          {categoryGroup.name}
          <ul>
            {categoryGroup.categories.map(category => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);

Index.getInitialProps = async function() {
  const response = await ynabApi.categories.getCategories(budgetId);
  const categoryGroups = response.data.category_groups;
  const filteredCategoryGroups = categoryGroups.filter(
    categoryGroup =>
      categoryGroup.id !== internalMasterCategoryId &&
      categoryGroup.id !== hiddenCategoriesId
  );

  return {
    categoryGroups: filteredCategoryGroups,
  };
};

export default Index;
