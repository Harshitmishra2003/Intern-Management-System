package Intern.Management.Intern.management.entities;

public enum IdCardType {

    PREMIUM("Premium"),
    FREE("Free");

    private final String displayName;

    IdCardType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
