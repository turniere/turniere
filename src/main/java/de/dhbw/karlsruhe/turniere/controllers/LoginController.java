package de.dhbw.karlsruhe.turniere.controllers;

import de.dhbw.karlsruhe.turniere.forms.RegisterForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
    @GetMapping(value = "/login")
    String login(RegisterForm registerForm) {
        return "login";
    }
}
