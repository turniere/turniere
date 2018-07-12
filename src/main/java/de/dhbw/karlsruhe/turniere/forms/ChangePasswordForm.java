package de.dhbw.karlsruhe.turniere.forms;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;

@Getter
@Setter
public class ChangePasswordForm {
    @Size(min = 12)
    private String password;

    @Size(min = 12)
    private String repassword;
}
