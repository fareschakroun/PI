from django.db import models

class Document(models.Model):
    title = models.CharField(max_length=255)
    pdf_blob = models.BinaryField()
    class Meta:
        app_label = 'matchingCV'