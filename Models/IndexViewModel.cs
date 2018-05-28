namespace go2sweden.Models
{
    public class IndexViewModel
    {
        public IndexViewModel() { }
        public string Title { get; set; }
        public string Message { get; set; }
        public IndexViewModel Load(){
            IndexViewModel model = new IndexViewModel();
            model.Title = "Go 2 Sweden!";
            model.Message = "Hej!";
            return model;
        }
    }
}