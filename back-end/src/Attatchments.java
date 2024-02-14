public class Attatchments {
    private String flyerPath;
    private String miniFlyerPath;

    public Attatchments(String flyerPath, String miniFlyerPath){
        this.flyerPath = flyerPath;
        this.miniFlyerPath = miniFlyerPath;
    }

    public String getFlyer(){
        return flyerPath;
    }

    public Stirng getMiniFlyer(){
        return miniFlyerPath;
    }
}