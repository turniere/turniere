import java.sql.*;

public class DatabaseManager {
    Connection databaseConnection;

    public DatabaseManager() throws SQLException, ClassNotFoundException {

        String sqlitePath = "database.sqlite";

        Class.forName("org.sqlite.JDBC");
        databaseConnection = DriverManager.getConnection("jdbc:sqlite:" + sqlitePath);
    }

    public boolean verifyUserCredentials(String email, String password) throws SQLException {
        final String statement = "SELECT password from users where email=?";
        PreparedStatement ps = databaseConnection.prepareStatement(statement);
        ps.setString(1, email);
        ResultSet result = ps.executeQuery();
        if (result.next()) {
            String passwordFromDatabase = result.getString("password");
            return passwordFromDatabase.equals(password);
        }
        return false;
    }

    public boolean doesMailExist(String email) throws SQLException {
        final String statement = "SELECT email FROM users where email=?";
        PreparedStatement ps = databaseConnection.prepareStatement(statement);
        ps.setString(1, email);
        ResultSet result = ps.executeQuery();
        return result.next();
    }
}
