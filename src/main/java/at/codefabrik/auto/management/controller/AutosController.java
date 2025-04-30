package at.codefabrik.auto.management.controller;

import at.codefabrik.auto.management.model.Autos;
import at.codefabrik.auto.management.service.AutosService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;

import static at.codefabrik.auto.management.constant.Constant.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/autos")
public class AutosController {

    private final AutosService autosService;

    @PostMapping
    public ResponseEntity<Autos> createAutos(@RequestBody Autos autos){
        //return ResponseEntity.ok().body(autosService.createAutos(autos));
        return ResponseEntity.created(URI.create("/autos/userID")).body(autosService.createAutos(autos));
    }

    @GetMapping
    public ResponseEntity<Page<Autos>> getAutos(@RequestParam (value = "page", defaultValue = "0") int page,
                                                @RequestParam (value = "size", defaultValue = "10") int size){
        return ResponseEntity.ok().body(autosService.getAllAutos(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Autos> getAutos(@PathVariable(value = "id") String id){
        return ResponseEntity.ok().body(autosService.getAutos(id));
    }

    @PutMapping("photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("id") String id, @RequestParam("file")MultipartFile file){
        return ResponseEntity.ok().body(autosService.uploadPhoto(id, file));
    }

    @GetMapping(path = "/image/{filename}", produces = {IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE})
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }

}
