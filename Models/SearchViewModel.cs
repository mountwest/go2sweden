namespace go2sweden.Models
{
    public class SearchViewModel
    {
        public SearchViewModel () { }
        public string Test { get; set; }
        public SearchViewModel Load(){
            SearchViewModel result = new SearchViewModel();
            result.Test = "http://free.rome2rio.com/api/1.4/json/Search?key=S2Q8spaR&oName=Stockholm&dName=Åre&noRideshare";
            return result;
        }
    }
}
