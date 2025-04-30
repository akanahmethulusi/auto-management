package at.codefabrik.auto.management.service;

import at.codefabrik.auto.management.model.Autos;
import at.codefabrik.auto.management.repo.AutosRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static at.codefabrik.auto.management.constant.Constant.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class AutosService {

    private final AutosRepo autosRepo;

    public Page<Autos> getAllAutos(int page, int size) {
        return (Page<Autos>) autosRepo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }


    public Autos getAutos(String id) {
        return autosRepo.findById(id).orElseThrow(()-> new RuntimeException("Autos not found"));
    }

    public Autos createAutos(Autos autos) {
        return autosRepo.save(autos);
    }

    public void deleteAutos(Autos autos){
        //Assignment
    }

    public String uploadPhoto(String id, MultipartFile file) {
        log.info("Saving picture for user ID: {}", id);
        Autos autos = getAutos(id);
        String photoUrl = photoFunction.apply(id, file);
        autos.setPhotoUrl(photoUrl);
        autosRepo.save(autos);
        return photoUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename)
            .filter(name ->name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") +1 ))
            .orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) ->{
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)){
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve( filename ), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/autos/image/" + filename).toUriString();
        }catch (Exception exception){
            throw new RuntimeException("unable to save Image");
        }
    };
}
