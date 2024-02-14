public enum EventType {
    // TODO: Add more event types
    CULTURAL("Cultural"),
    SPORTS("Sports"),
    THEATER("Theater");

    private final String typeName;

    EventType(String typeName) {
        this.typeName = typeName;
    }

    public String toString() {
        return typeName;
    }
}