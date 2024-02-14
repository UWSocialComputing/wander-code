public class Address {
    String nameOfLocation;
    String line1;
    String line2;
    String city;
    String state;
    int zipcode;

    public Address(String nameOfLocation, String line1, String line2, String city, String state, int zipcode){
        this.nameOfLocation = nameOfLocation;
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
    }
}
