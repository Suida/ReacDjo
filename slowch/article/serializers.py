from rest_framework import serializers

from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    html_content = serializers.CharField(read_only=True)
    created_at = serializers.DateTimeField()
    modified_at = serializers.DateTimeField()

    def create(self, validated_data):
        return super().create(validated_data)

    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'raw_content',
            'html_content',
            'created_at',
            'modified_at',
        ]
