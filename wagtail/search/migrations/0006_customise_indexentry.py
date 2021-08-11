# Generated by Django 3.2.4 on 2021-07-12 22:49

from wagtail.search.models import IndexEntry
from django.db import migrations, models
from django.db import connection


# This migration takes on the base model defined in 0005_create_indexentry and adds certain fields that are specific to each database system
class Migration(migrations.Migration):

    dependencies = [
        ('wagtailsearch', '0005_create_indexentry'),
    ]

    if connection.vendor == 'postgresql':
        import django.contrib.postgres.indexes
        import django.contrib.postgres.search

        operations = [
            migrations.AddField(
                model_name='indexentry',
                name='autocomplete',
                field=django.contrib.postgres.search.SearchVectorField(),
            ),
            migrations.AddField(
                model_name='indexentry',
                name='title',
                field=django.contrib.postgres.search.SearchVectorField(),
            ),
            migrations.AddField(
                model_name='indexentry',
                name='body',
                field=django.contrib.postgres.search.SearchVectorField(),
            ),
            migrations.AddIndex(
                model_name='indexentry',
                index=django.contrib.postgres.indexes.GinIndex(fields=['autocomplete'], name='wagtailsear_autocom_476c89_gin'),
            ),
            migrations.AddIndex(
                model_name='indexentry',
                index=django.contrib.postgres.indexes.GinIndex(fields=['title'], name='wagtailsear_title_9caae0_gin'),
            ),
            migrations.AddIndex(
                model_name='indexentry',
                index=django.contrib.postgres.indexes.GinIndex(fields=['body'], name='wagtailsear_body_90c85d_gin'),
            )
        ]

    elif connection.vendor == 'sqlite':
        operations = [
            migrations.AddField(
                model_name='indexentry',
                name='autocomplete',
                field=models.TextField(null=True),
            ),
            migrations.AddField(
                model_name='indexentry',
                name='body',
                field=models.TextField(null=True),
            ),
            migrations.AddField(
                model_name='indexentry',
                name='title',
                field=models.TextField(),
            ),
            migrations.SeparateDatabaseAndState(state_operations=[
                migrations.CreateModel(
                    name='sqliteftsindexentry',
                    fields=[
                        ('index_entry', models.OneToOneField(primary_key=True, serialize=False, to='wagtailsearch.indexentry', on_delete=models.CASCADE, db_column='rowid')),
                        ('title', models.TextField()),
                        ('body', models.TextField(null=True)),
                        ('autocomplete', models.TextField(null=True)),
                    ],
                    options={'db_table': '%s_fts' % IndexEntry._meta.db_table},
                ),
            ], database_operations=[
                migrations.RunSQL(sql=('CREATE VIRTUAL TABLE %s_fts USING fts5(autocomplete, body, title)' % IndexEntry._meta.db_table), reverse_sql=('DROP TABLE %s_fts' % IndexEntry._meta.db_table)),
                migrations.RunSQL(sql=('CREATE TRIGGER insert_wagtailsearch_indexentry_fts AFTER INSERT ON %s BEGIN INSERT INTO %s_fts(title, body, autocomplete, rowid) VALUES (NEW.title, NEW.body, NEW.autocomplete, NEW.id); END' % (IndexEntry._meta.db_table, IndexEntry._meta.db_table)), reverse_sql=('DROP TRIGGER insert_wagtailsearch_indexentry_fts')),
                migrations.RunSQL(sql=('CREATE TRIGGER update_wagtailsearch_indexentry_fts AFTER UPDATE ON %s BEGIN UPDATE %s_fts SET title=NEW.title, body=NEW.body, autocomplete=NEW.autocomplete WHERE rowid=NEW.id; END' % (IndexEntry._meta.db_table, IndexEntry._meta.db_table)), reverse_sql=('DROP TRIGGER update_wagtailsearch_indexentry_fts')),
                migrations.RunSQL(sql=('CREATE TRIGGER delete_wagtailsearch_indexentry_fts AFTER DELETE ON %s BEGIN DELETE FROM %s_fts WHERE rowid=OLD.id; END' % (IndexEntry._meta.db_table, IndexEntry._meta.db_table)), reverse_sql=('DROP TRIGGER delete_wagtailsearch_indexentry_fts'))
            ])
        ]