package com.example.backend.service;
import java.util.UUID;
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.backend.dto.ResponseDTO;
import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserLoginDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.FormRepository;
import com.example.backend.dto.DashboardDataDto;
import com.example.backend.model.Form;

    @Service
    public class UserService{
    
    @Autowired
    UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private FormRepository formRepository;

    public User mapDtoUser(UserDto dto){
        User doc=new User();
        doc.setId(UUID.randomUUID().toString());
        doc.setName(dto.getName());
        doc.setEmail(dto.getEmail());
        dto.setAdmin(dto.isAdmin()); 
        String encryptedPassword = passwordEncoder.encode(dto.getPassword());
        doc.setPassword(encryptedPassword);
        doc.setCreatedBy(dto.getName());
        doc.setUpdatedBy(dto.getName());
        return doc;
    }

    private UserDto mapUserToDto(User user) {
    UserDto dto = new UserDto();
    dto.setId(user.getId());
    dto.setName(user.getName());
    dto.setEmail(user.getEmail());
    // Add other non-sensitive fields
    return dto;
}

    
    public ResponseDTO addUser(UserDto dto){
        User matchedUser = repo.findAll().stream()
        .filter(u -> u.getEmail().equals(dto.getEmail()))
        .findFirst()
        .orElse(null);
            ResponseDTO rdto= new ResponseDTO();
        if (matchedUser == null) {
            User doc= mapDtoUser(dto);
            repo.save(doc);
            //return ResponseEntity.ok("Admin added");
            rdto.setMessage("User added");
            rdto.setUser(mapUserToDto(doc));
        } 
        else {
            rdto.setMessage("User Already exists");
        }
        return rdto;
    }

    public ResponseEntity<User> GetuserById(@PathVariable String id){
        return repo.findById(id)
               .map(ResponseEntity::ok)          // → 200 OK with the TestDoc JSON
               .orElse(ResponseEntity.notFound() // → 404 if id not present
                                        .build());
    }


    public ResponseDTO GetuserByEmail(UserLoginDTO dto){
        User user=  repo.findAll().stream()
        .filter(u -> u.getEmail().equals(dto.getEmail()) &&
                    passwordEncoder.matches(dto.getPassword(), u.getPassword()))
        .findFirst()
        .orElse(null);
        ResponseDTO rdto= new ResponseDTO();
    if (user != null) {
        rdto.setMessage("login success");
        rdto.setUser(mapUserToDto(user));
    } else {
        rdto.setMessage("username or password incorrect");
    }
    return rdto;
}

    public DashboardDataDto getDashboardData(String email) {
    User user = repo.findAll().stream()
        .filter(u -> u.getEmail().equals(email))
        .findFirst()
        .orElse(null);

    if (user == null) return null;

    List<Form> forms = formRepository.findByUserId(user.getId());

    DashboardDataDto dto = new DashboardDataDto();
    dto.setTotalForms(forms.size());
    dto.setTotalResponses(forms.stream().mapToInt(Form::getResponseCount).sum());
    dto.setActiveForms((int) forms.stream().filter(f -> f.getStatus().equalsIgnoreCase("active")).count());

    List<DashboardDataDto.FormSummary> summaries = forms.stream().map(form -> {
        DashboardDataDto.FormSummary fs = new DashboardDataDto.FormSummary();
        fs.setId(form.getId());
        fs.setTitle(form.getTitle());
        fs.setStatus(form.getStatus());
        fs.setResponses(form.getResponseCount());
        fs.setCreatedAt(form.getCreatedAt().toString());
        return fs;
    }).toList();

    dto.setForms(summaries);
    return dto;
}
    }


// User:-
// /register_user 
// /login_user - send user object


// Admin:-
// /register_admin  - keep is_admin as true