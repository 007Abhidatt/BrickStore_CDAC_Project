using BrickStoreBackend.Models;

namespace BrickStoreBackend.Repositories
{
    public interface ICategoryRepository
    {
        Task AddCategoryAsync(Category category);
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
    }
}
